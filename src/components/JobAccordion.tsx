import type { Job } from "@/lib/startups";
import { jobMeta } from "@/lib/format";
import { IconChevronDown, IconExternalLink } from "@tabler/icons-react";
import Pill from "@/components/Pill";

// One posting, expandable to its description paragraphs and ideal-candidate
// traits. Shared by /startups/[slug] and /intern so the two never drift.
//
// `card` — a self-contained bordered tile (startup detail page).
// `row`  — sits inside a parent `divide-y` list, so it supplies no border or
//          fill of its own and uses slightly larger type (/intern).
type Variant = "card" | "row";

export default function JobAccordion({
  job,
  variant = "card",
}: {
  job: Job;
  variant?: Variant;
}) {
  const hasInfo = job.description.length > 0 || job.traits.length > 0;
  const row = variant === "row";

  return (
    <details
      className={
        row
          ? "group/job transition-colors open:bg-white/[0.02] hover:bg-white/[0.04]"
          : "group/job bg-white/[0.03] border border-white/[0.07] rounded-lg overflow-hidden"
      }
    >
      <summary
        className={`flex items-center justify-between gap-3 cursor-pointer list-none ${
          row ? "p-5" : "px-4 py-3"
        }`}
      >
        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <p className={`text-white font-semibold${row ? "" : " text-sm"}`}>{job.title}</p>
            <Pill>
              {job.spots} open {job.spots === 1 ? "spot" : "spots"}
            </Pill>
          </div>
          <p className={`text-[var(--muted)] mt-0.5 ${row ? "text-sm" : "text-xs"}`}>
            {jobMeta(job)}
          </p>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          {job.url && (
            <a
              href={job.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--accent-light)] hover:text-white transition-colors"
            >
              Apply
              <IconExternalLink className={row ? "w-4 h-4" : "w-3.5 h-3.5"} stroke={2} />
            </a>
          )}
          {hasInfo && (
            <IconChevronDown
              className="w-4 h-4 text-[var(--muted)] transition-transform group-open/job:rotate-180"
              stroke={2}
            />
          )}
        </div>
      </summary>

      {hasInfo && (
        <div
          className={
            row
              ? "px-5 pb-5 pt-0 space-y-3"
              : "px-4 pb-4 pt-1 border-t border-white/[0.07] space-y-3"
          }
        >
          {job.description.map((para, pi) => (
            <p key={pi} className="text-[var(--muted-light)] text-sm leading-relaxed">
              {para}
            </p>
          ))}
          {job.traits.length > 0 && (
            <div>
              <p className="text-[var(--muted)] text-xs font-bold uppercase tracking-widest mb-1.5">
                Ideal Candidate Traits
              </p>
              <ul className="list-disc list-inside text-[var(--muted-light)] text-sm space-y-1">
                {job.traits.map((trait, ti) => (
                  <li key={ti}>{trait}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Second apply affordance: once the description is expanded the link
              in the summary row has scrolled out of reach on a long posting. */}
          {job.url && (
            <div className="pt-1">
              <a
                href={job.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-105"
                style={{ background: "var(--accent)" }}
              >
                Apply for this role
                <IconExternalLink className="w-4 h-4" stroke={2} />
              </a>
            </div>
          )}
        </div>
      )}
    </details>
  );
}
