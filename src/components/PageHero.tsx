import Image from "next/image";
import type { ReactNode } from "react";

// The shared photo hero used by /found, /intern, /team, /support and /mentor.
// These were five hand-copied blocks with byte-identical scrim, h1 and p class
// strings.
//
// `paddingTop` stays a per-page value rather than a single constant: the text is
// vertically centred, so each page's clearance below the fixed navbar was
// hand-tuned and collapsing them would move type on four pages at once.
export default function PageHero({
  image,
  title,
  subtitle,
  paddingTop,
  tightTitle = false,
  spacedSubtitle = false,
  children,
}: {
  image: string;
  title: string;
  subtitle: ReactNode;
  /** Pixels of top padding clearing the ~88px fixed navbar. */
  paddingTop: number;
  /** Adds `leading-[1.05]` to the h1 (used by the two longest titles). */
  tightTitle?: boolean;
  /** Adds `mb-8` below the subtitle. */
  spacedSubtitle?: boolean;
  /** Optional CTA block rendered below the subtitle. */
  children?: ReactNode;
}) {
  return (
    <section
      className="relative min-h-[40vh] flex items-center justify-center overflow-hidden border-b border-white/[0.13]"
      style={{ paddingTop }}
    >
      <div className="absolute inset-0 z-0">
        <Image
          src={image}
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center"
          priority
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0.3) 100%)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-16 text-center">
        <h1
          className={`animate-fade-up opacity-0 font-black text-5xl md:text-6xl lg:text-7xl text-white mb-4${
            tightTitle ? " leading-[1.05]" : ""
          }`}
        >
          {title}
        </h1>
        <p
          className={`animate-fade-up opacity-0 animation-delay-100 text-lg text-white/80${
            spacedSubtitle ? " mb-8" : ""
          } max-w-xl mx-auto`}
        >
          {subtitle}
        </p>
        {children && (
          <div className="animate-fade-up opacity-0 animation-delay-200">{children}</div>
        )}
      </div>
    </section>
  );
}
