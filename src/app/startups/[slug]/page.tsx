import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getStartupBySlug, allStartupSlugs, LATEST_COHORT } from "@/lib/startups";
import { initials } from "@/lib/format";
import type { Job } from "@/lib/startups";
import StatusBadge from "@/components/StatusBadge";
import StartupLogoTile from "@/components/StartupLogoTile";
import BackerPills from "@/components/BackerPills";
import Pill from "@/components/Pill";
import JobAccordion from "@/components/JobAccordion";
import {
  IconChevronLeft,
  IconExternalLink,
  IconBrandLinkedinFilled,
} from "@tabler/icons-react";

export async function generateStaticParams() {
  return allStartupSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const startup = getStartupBySlug(slug);
  if (!startup) return {};
  return {
    title: `${startup.name} — Claremont Accelerator`,
    description: startup.tagline,
  };
}

export default async function StartupPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const startup = getStartupBySlug(slug);
  if (!startup) notFound();

  const paragraphs = startup.body
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <div className="min-h-screen pt-36 pb-20 bg-[var(--background)] flat-cards">
      <div className="max-w-3xl mx-auto px-6">
        {/* Back link */}
        <Link
          href="/startups"
          className="inline-flex items-center gap-2 text-[var(--muted)] hover:text-white text-sm font-medium transition-colors mb-10 group"
        >
          <IconChevronLeft
            className="w-4 h-4 transition-transform group-hover:-translate-x-0.5"
            stroke={2}
          />
          All Startups
        </Link>

        {/* Header */}
        <div className="flex items-start gap-5 mb-8">
          <StartupLogoTile startup={startup} size="lg" />
          <div className="flex-1 min-w-0">
            <h1 className="font-black text-4xl md:text-5xl text-white mb-3">
              {startup.website && !startup.website.includes("example.com") ? (
                <a
                  href={startup.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--accent-light)] transition-colors"
                >
                  {startup.name}
                </a>
              ) : (
                startup.name
              )}
            </h1>
            <div className="flex items-center gap-2 flex-wrap">
              <Pill tone={startup.cohort === LATEST_COHORT ? "current" : "accent"}>
                Cohort {startup.cohort}
              </Pill>
              <StatusBadge status={startup.status} />
              <BackerPills backers={startup.backers} />
            </div>
          </div>
        </div>

        {/* Tagline */}
        {startup.tagline && (
          <p className="text-[var(--muted-light)] text-xl font-medium leading-relaxed border-l-2 border-[var(--accent)] pl-5 mb-8">
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

        <div className="border-t border-white/[0.07] pt-8 flex flex-col gap-8">
          {/* Founders */}
          {startup.founders.length > 0 && (
            <div>
              <p className="text-[var(--muted)] text-xs font-bold uppercase tracking-widest mb-3">
                Founders
              </p>
              <div className="flex flex-wrap gap-2">
                {startup.founders.map((founder) => {
                  const Pill = founder.linkedin ? "a" : "div";
                  return (
                    <Pill
                      key={founder.name}
                      {...(founder.linkedin
                        ? { href: founder.linkedin, target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className={`flex items-center gap-2 bg-white/[0.03] border border-white/[0.07] rounded-lg px-3 py-2 group/founder ${
                        founder.linkedin ? "hover:border-[#0A66C2]/40 transition-colors" : ""
                      }`}
                    >
                      <div className="w-6 h-6 rounded-full bg-[#0165fc]/20 flex items-center justify-center flex-shrink-0 overflow-hidden">
                        {founder.photoExists ? (
                          <Image
                            src={founder.photo}
                            alt={founder.name}
                            width={24}
                            height={24}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-[var(--accent-light)] font-black text-xs">
                            {initials(founder.name)}
                          </span>
                        )}
                      </div>
                      <span className="text-white text-sm font-medium">
                        {founder.name}
                      </span>
                      {founder.linkedin && (
                        <IconBrandLinkedinFilled className="w-4 h-4 text-[var(--muted)] group-hover/founder:text-[#0A66C2] transition-colors flex-shrink-0" />
                      )}
                    </Pill>
                  );
                })}
              </div>
            </div>
          )}

          {/* Jobs — only rendered when JOBS_LIVE is on and the startup has roles */}
          <div>
            <p className="text-[var(--muted)] text-xs font-bold uppercase tracking-widest mb-3">
              Open Roles
            </p>
            {startup.jobs.length === 0 ? (
              <p className="text-[var(--muted)] text-sm">No open roles right now.</p>
            ) : (
              <div className="flex flex-col gap-2">
                {startup.jobs.map((job: Job, i: number) => (
                  <JobAccordion key={i} job={job} />
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
              className="inline-flex items-center gap-2 bg-[var(--accent)] text-white font-semibold px-5 py-2.5 rounded-full text-sm hover:scale-105 transition-transform self-start"
            >
              Visit Website
              <IconExternalLink className="w-3.5 h-3.5" stroke={2} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
