import ScrollReveal from "@/components/ScrollReveal";
import Image from "next/image";
import Link from "next/link";
import { IconArrowRight, IconBolt, IconBulb } from "@tabler/icons-react";

export const metadata = {
  title: "Found a CA Startup",
};

// Application form URLs. Both buttons are disabled placeholders right now, so
// these are intentionally unreferenced — kept for when applications reopen.
/* eslint-disable @typescript-eslint/no-unused-vars */
const FOUNDER_APPLICATION_URL = "https://docs.google.com/forms/d/1ODnyqt-Y0f1UXhx-2BRLloTDYEwGQIL-UJDZOqmDgA4/edit";
const STUDIO_APPLICATION_URL = "https://docs.google.com/forms/d/1BWg-0runr2VRAaaMXf554R0jLM80_S2Bj1qWApXZBps/edit";
/* eslint-enable @typescript-eslint/no-unused-vars */

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
    logo: "/startups/logos/pheratech.png",
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
    tagline: "Turn your API endpoints into MCP tools (formerly Openflow).",
    cohort: "Cohort 3",
    story: "Accepted into a16z Speedrun SR007",
  },
];

export default function Apply() {
  return (
    <div className="relative min-h-screen bg-black flat-cards">
      <div className="relative z-10">
      {/* Hero Section */}
      <section className="relative min-h-[40vh] flex items-center justify-center overflow-hidden pt-[79px] border-b border-white/[0.13]">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/acceleratormeeting-11.jpg"
            alt=""
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0.3) 100%)' }} />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-6 py-16 text-center">
          <h1 className="animate-fade-up opacity-0 font-black text-5xl md:text-6xl lg:text-7xl text-white mb-4 leading-[1.05]">
            Found a CA Startup
          </h1>
          <p className="animate-fade-up opacity-0 animation-delay-100 text-lg text-white/80 mb-8 max-w-xl mx-auto">
            Get non-dilutive funding, mentorship from 40+ VCs and founders, and paid interns to build alongside you.
          </p>
        </div>
      </section>

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
                  <p className="text-[#a5b4fc] font-medium">Main Program</p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="text-white font-bold mb-3">What You Get</h4>
                  <ul className="text-[var(--muted-light)] space-y-2">
                    <li>• <span className="text-white font-medium">$5,000 - $15,000</span> in non-dilutive funding</li>
                    <li>• Mentorship from 40+ VCs and founders</li>
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
              <div className="mt-auto pt-6">
                <span className="glass glass-flat inline-flex items-center justify-center rounded-full px-6 py-3 text-[15px] font-semibold text-white/45 cursor-not-allowed">
                  Applications Closed
                </span>
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
                  <p className="text-[#a5b4fc] font-medium">Pre-Accelerator Program</p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="text-white font-bold mb-3">What You Get</h4>
                  <ul className="text-[var(--muted-light)] space-y-2">
                    <li>• Semester-long structured program</li>
                    <li>• <span className="text-white font-medium">$1,000</span> in funding</li>
                    <li>• Workshops and mentorship sessions</li>
                    <li>• Automatic final-round interview for main program</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-white font-bold mb-3">Who Should Apply</h4>
                  <ul className="text-[var(--muted-light)] space-y-2">
                    <li>• Individual founders (not teams)</li>
                    <li>• Early-stage or idea-stage</li>
                    <li>• Looking to validate and build your first MVP</li>
                    <li>• Want a pathway to the main accelerator</li>
                  </ul>
                </div>
              </div>

              <div className="mt-auto pt-6">
                <span className="glass glass-flat inline-flex items-center justify-center rounded-full px-6 py-3 text-[15px] font-semibold text-white/45 cursor-not-allowed">
                  Applications Closed
                </span>
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
              <p className="text-xs md:text-sm uppercase tracking-[0.2em] text-[#3385fd] font-semibold mb-4">
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
                      <p className="text-[#3385fd] text-xs font-semibold uppercase tracking-wider mt-1">
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
                className="inline-flex items-center gap-1.5 text-[#3385fd] hover:text-white text-sm font-semibold transition-colors"
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
