import type { ReactNode } from "react";

// The small uppercase chip used for cohort / status / backers / open-spot
// labels. This shape was hand-copied in five places; keep new chips here.
//
// `accent`  — blue, for affirmative metadata (backers, cohort, open spots)
// `muted`   — neutral grey outline
// `success` — green, for the Active status badge
// `current` — gold, for the cohort pill when it's the latest cohort
type Tone = "accent" | "muted" | "success" | "current";

const TONES: Record<Tone, string> = {
  // the /40 opacity modifier needs the raw hex — Tailwind can't apply it to a var()
  accent: "text-[var(--accent-light)] border-[#0165fc]/40",
  muted: "text-[var(--muted)] border-white/15",
  success: "text-emerald-400 border-emerald-500/40",
  current: "text-[#E8B923] border-[#E8B923]/40",
};

export default function Pill({
  tone = "accent",
  className = "",
  children,
}: {
  tone?: Tone;
  className?: string;
  children: ReactNode;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest rounded px-2 py-0.5 border ${TONES[tone]}${className ? ` ${className}` : ""}`}
    >
      {children}
    </span>
  );
}
