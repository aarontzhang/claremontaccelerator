import ScrollReveal from "@/components/ScrollReveal";
import Image from "next/image";
import Link from "next/link";
import { IconArrowRight, IconBolt, IconBulb } from "@tabler/icons-react";
import { STUDIO_APPLICATION_URL } from "@/lib/links";
import { MENTOR_COUNT, ACCELERATOR_FUNDING, STUDIO_FUNDING } from "@/lib/program";
import PageHero from "@/components/PageHero";

export const metadata = {
  title: "Found a CA Startup",
};


type Outcome = {
  name: string;
  slug: string | null;
  logo: string | null;
  tagline: string;
  cohort: string;
  story: string;
  tileBg?: string;
  tilePadding?: string;
};

const outcomes: Outcome[] = [
  {
    name: "Kandor",
    slug: "kandor-ai",
    logo: "/startups/logos/kandor-ai.png",
    tagline: "Reimagining operations for specialty medical clinics.",
    cohort: "Cohort 4",
    story: "Accepted into YC S26",
  },
  {
    name: "Peer",
    slug: null,
    logo: "/startups/logos/peer.png",
    tagline: "Revolutionizing the freight brokerage industry.",
    cohort: "Cohort 4",
    story: "Accepted into YC S26",
  },
  {
    name: "Pheratech",
    slug: "pheratech",
    logo: "/startups/logos/pheratech.webp",
    tagline: "Swarm intelligence for autonomous multi-robot systems.",
    cohort: "Cohort 2",
    story: "Raised from 1517, Afore Capital, among others",
    tileBg: "bg-white",
    tilePadding: "p-2",
  },
  {
    name: "Preman",
    slug: "openflow",
    logo: "/startups/logos/preman.png",
    tagline: "An agent testing platform for MCP tools (formerly Openflow).",
    cohort: "Cohort 3",
    story: "Accepted into a16z Speedrun SR007",
  },
];

export default function Apply() {
  return (
    <div className="relative min-h-screen bg-black flat-cards">
      <div className="relative z-10">
      {/* Hero Section */}
      <PageHero
        image="/acceleratormeeting-11.webp"
        title="Found a CA Startup"
        subtitle={`Get non-dilutive funding, mentorship from ${MENTOR_COUNT} VCs and founders, and paid interns to build alongside you.`}
        paddingTop={79}
        tightTitle
        spacedSubtitle
      />

      {/* Program Sections */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-6">
          <ScrollReveal>
            <h2 className="font-black text-3xl md:text-4xl text-white mb-12 text-center">
              Two paths for founders
            </h2>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-8">
          {/* Program 1: Claremont Accelerator (Main) */}
          <ScrollReveal>
            <div className="glass h-full rounded-2xl p-6 flex flex-col">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center flex-shrink-0">
                  <IconBolt className="w-6 h-6 text-slate-700" stroke={2} />
                </div>
                <div>
                  <h3 className="font-black text-2xl text-white">Claremont Accelerator</h3>
                  <p className="text-[var(--accent-soft)] font-medium">Main Program</p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="text-white font-bold mb-3">What You Get</h4>
                  <ul className="text-[var(--muted-light)] space-y-2">
                    <li>• Up to <span className="text-white font-medium">{ACCELERATOR_FUNDING}</span> in non-dilutive funding</li>
                    <li>• Mentorship from {MENTOR_COUNT} VCs and founders</li>
                    <li>• Paid interns matched to your startup</li>
                    <li>• Demo Day presentation to investors</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-white font-bold mb-3">Who Should Apply</h4>
                  <ul className="text-[var(--muted-light)] space-y-2">
                    <li>• Startups with traction (users, revenue, or prior funding)</li>
                    <li>• Teams committed to building full-time or significant part-time</li>
                    <li>• At least one founder from the 5Cs</li>
                  </ul>
                </div>
              </div>

              {/* mt-auto pins this to the card bottom so both cards' buttons
                  line up regardless of how long the lists above them are. */}
              <div className="mt-auto pt-6 flex flex-wrap items-center gap-3">
                <Link
                  href="/found/cohort"
                  className="inline-flex items-center justify-center rounded-full px-6 py-3 text-[15px] font-semibold text-white transition-transform hover:scale-105"
                  style={{ background: "var(--accent)" }}
                >
                  Apply here
                </Link>
              </div>
            </div>
          </ScrollReveal>

          {/* Program 2: CA Studio */}
          <ScrollReveal>
            <div className="glass h-full rounded-2xl p-6 flex flex-col">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center flex-shrink-0">
                  <IconBulb className="w-6 h-6 text-slate-700" stroke={2} />
                </div>
                <div>
                  <h3 className="font-black text-2xl text-white">CA Studio</h3>
                  <p className="text-[var(--accent-soft)] font-medium">Pre-Accelerator Program</p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="text-white font-bold mb-3">What You Get</h4>
                  <ul className="text-[var(--muted-light)] space-y-2">
                    <li>• Up to <span className="text-white font-medium">{STUDIO_FUNDING}</span> in funding</li>
                    <li>• Semester-long structured program</li>
                    <li>• Workshops and mentorship sessions</li>
                    <li>• Automatic final-round interview for main program</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-white font-bold mb-3">Who Should Apply</h4>
                  <ul className="text-[var(--muted-light)] space-y-2">
                    <li>• Teams and solo participants welcome</li>
                    <li>• Early-stage or idea-stage</li>
                    <li>• Looking to validate and build your first MVP</li>
                    <li>• Want a pathway to the main accelerator</li>
                  </ul>
                </div>
              </div>

              <div className="mt-auto pt-6 flex flex-wrap items-center gap-3">
                <a
                  href={STUDIO_APPLICATION_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full px-6 py-3 text-[15px] font-semibold text-white transition-transform hover:scale-105"
                  style={{ background: "var(--accent)" }}
                >
                  Apply here
                </a>
              </div>
            </div>
          </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Outcomes Section */}
      <section className="py-20 border-t border-white/[0.07]">
        <div className="max-w-6xl mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-14">
              <p className="text-xs md:text-sm uppercase tracking-[0.2em] text-[var(--accent-light)] font-semibold mb-4">
                Outcomes
              </p>
              <h2 className="font-black text-4xl md:text-5xl text-white mb-4">
                Where CA founders end up.
              </h2>
              <p className="text-[var(--muted-light)] text-lg max-w-2xl mx-auto">
                A snapshot of alumni companies still building after Demo Day — raising capital, shipping product, and hiring the next cohort of 5C talent.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {outcomes.map((o, i) => {
              const CardInner = (
                <div className="glass glass-hover h-full rounded-2xl p-6">
                  <div className="relative z-10 flex items-center gap-4 mb-5">
                    {o.logo ? (
                      <div className={`w-14 h-14 rounded-xl border border-white/12 flex items-center justify-center flex-shrink-0 ${o.tileBg ?? "bg-white/[0.07]"} ${o.tilePadding ?? "p-0.5"}`}>
                        <Image
                          src={o.logo}
                          alt={o.name}
                          width={48}
                          height={48}
                          className="object-contain w-full h-full rounded-lg"
                        />
                      </div>
                    ) : (
                      <div className="w-14 h-14 rounded-xl bg-white/[0.07] border border-white/12 flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-black text-lg">
                          {o.name.charAt(0)}
                        </span>
                      </div>
                    )}
                    <div className="min-w-0">
                      <p className="font-black text-xl text-white leading-tight">{o.name}</p>
                      <p className="text-[var(--accent-light)] text-xs font-semibold uppercase tracking-wider mt-1">
                        {o.cohort}
                      </p>
                    </div>
                  </div>
                  <p className="text-white/90 font-medium text-sm mb-3 leading-snug">
                    {o.tagline}
                  </p>
                  <p className="text-white font-bold text-sm leading-relaxed">
                    {o.story}
                  </p>
                </div>
              );

              return (
                <ScrollReveal key={o.name} delay={i * 60}>
                  {o.slug ? (
                    <Link href={`/startups/${o.slug}`} className="block h-full">
                      {CardInner}
                    </Link>
                  ) : (
                    CardInner
                  )}
                </ScrollReveal>
              );
            })}
          </div>

          <ScrollReveal>
            <div className="text-center mt-10">
              <Link
                href="/startups"
                className="inline-flex items-center gap-1.5 text-[var(--accent-light)] hover:text-white text-sm font-semibold transition-colors"
              >
                Browse the full portfolio
                <IconArrowRight className="w-4 h-4" stroke={2} />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
      </div>
    </div>
  );
}
