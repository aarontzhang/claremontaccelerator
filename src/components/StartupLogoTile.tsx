import Image from "next/image";
import type { Startup } from "@/lib/startups";
import { initials, isDarkHex } from "@/lib/format";

// The logo tile used by the portfolio grid, the startup detail page and the
// /intern snapshot. Previously three hand-rolled copies that each used a
// different cohort fallback colour, and the /intern one ignored `logoBg` and
// `logoScale` entirely.
type Size = "sm" | "md" | "lg";

const SIZES: Record<Size, { box: string; px: number; pad: string; initial: string }> = {
  sm: { box: "w-12 h-12 rounded-lg", px: 48, pad: "p-0.5 rounded-md", initial: "text-lg" },
  md: { box: "w-14 h-14 rounded-xl", px: 56, pad: "p-1 rounded-md", initial: "text-xl" },
  lg: { box: "w-20 h-20 rounded-2xl", px: 80, pad: "p-2", initial: "text-3xl" },
};

export default function StartupLogoTile({
  startup,
  size = "sm",
  className = "",
}: {
  startup: Pick<Startup, "name" | "logo" | "logoExists" | "logoBg" | "logoScale" | "cohort">;
  size?: Size;
  className?: string;
}) {
  const s = SIZES[size];
  // Cohort 4+ logos are full-colour marks that need a white plate; earlier
  // cohorts sit on a faint translucent one. `logoBg` overrides both.
  const fallbackBg = startup.cohort >= 4 ? "bg-white" : "bg-white/[0.07]";
  // A dark logoBg needs a hairline to stay visible against the page's own
  // black ground.
  const needsBorder = !!startup.logoBg && isDarkHex(startup.logoBg);

  return (
    <div
      className={`${s.box} flex items-center justify-center flex-shrink-0 overflow-hidden ${
        startup.logoBg ? "" : fallbackBg
      } ${needsBorder ? "border border-white" : ""} ${className}`}
      style={startup.logoBg ? { backgroundColor: startup.logoBg } : undefined}
    >
      {startup.logoExists ? (
        <Image
          src={startup.logo}
          alt={startup.name}
          width={s.px}
          height={s.px}
          className={`object-contain ${s.pad}`}
          style={{ width: `${startup.logoScale}%`, height: `${startup.logoScale}%` }}
        />
      ) : (
        <span className={`text-white font-black ${s.initial}`}>{initials(startup.name)}</span>
      )}
    </div>
  );
}
