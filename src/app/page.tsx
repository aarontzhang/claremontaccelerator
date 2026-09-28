import ScrollReveal from "@/components/ScrollReveal";
import Image from "next/image";
import Link from "next/link";
import { IconArrowRight } from "@tabler/icons-react";

const startups = [
  { name: "Sokil", logo: "/logos/Sokil.webp", size: "large" },
  { name: "Exploravist", logo: "/logos/Exploravist.webp", size: "normal" },
  { name: "ArtHub", logo: "/logos/Arthub.webp", size: "normal" },
  { name: "GlamUp", logo: "/logos/Glam+up.webp", size: "large" },
  { name: "Pheratech", logo: "/logos/Pheratech.png", size: "normal" },
  { name: "Stag", logo: "/logos/Stag.png", size: "normal" },
];

const stats = [
  { value: "18", label: "Startups Supported" },
  { value: "$40,000,000+", label: "Combined Enterprise Value" },
  { value: "100+", label: "Mentors & VCs" },
];

export default function Home() {
  return (
    <div className="relative min-h-screen bg-black flat-cards">
      {/* pt here nudges every section down together; the navbar is a sibling
          of this wrapper (in layout.tsx) so it stays put. */}
      <div className="relative z-10 pt-0">
      {/* Hero Section */}
      {/* min-h-screen only from md up: that height exists to give the desktop
          team-cutout image room, and it's hidden on mobile — forcing full
          viewport height there just leaves dead space below the CTAs once the
          (now top-anchored) text content doesn't fill a tall phone screen. */}
      <section className="relative overflow-hidden md:min-h-[max(100vh,860px)]">

        {/* Team cutout — desktop only */}
        <div className="hidden md:flex absolute bottom-0 left-0 right-0 z-0 justify-center translate-y-24">
          <Image
            src="/betterbg-transparent.webp"
            alt="Claremont Accelerator team"
            width={1600}
            height={1101}
            className="w-[80%] h-auto"
            priority
          />
        </div>

        {/* Text — centered on mobile, top-aligned on desktop */}
        <div className="relative z-10 flex flex-col items-center justify-start text-center px-6 pt-28 pb-16 md:min-h-[max(100vh,860px)] md:pt-40 md:pb-0">
          <h1 className="animate-fade-up opacity-0 font-black text-5xl md:text-7xl lg:text-8xl text-white mb-5 md:whitespace-nowrap">
            Claremont Accelerator
          </h1>

          <p className="animate-fade-up opacity-0 animation-delay-100 text-xl md:text-2xl text-white/75 max-w-2xl mx-auto mb-11 leading-snug tracking-tight">
            We help 5C student-founders start and scale their startups by providing them with{" "}
            <span className="text-white font-semibold">money</span>,{" "}
            <span className="text-white font-semibold">mentorship</span>, and{" "}
            <span className="text-white font-semibold">manpower</span>.
          </p>

          {/* Backed by */}
          <div className="animate-fade-up opacity-0 animation-delay-200 flex items-center gap-6 mb-11 flex-wrap justify-center">
            <p className="text-white/40 text-xs uppercase tracking-widest font-medium whitespace-nowrap">CA founders backed by</p>
            {/* Below md: two explicit flex rows of 3, each with a uniform gap between
                marks — a 3-col grid centers each mark in an equal-width column, which
                reads as wildly uneven spacing once mark widths vary this much (Y vs.
                Speedrun). md:contents drops these row wrappers from the desktop layout
                so children rejoin the single flex-wrap row unchanged. */}
            <div className="flex flex-col gap-4 md:contents">
              <div className="flex items-center justify-center gap-5 md:contents">
                {/* YC — square mark, full color */}
                <div className="relative w-5 h-5 md:w-7 md:h-7 opacity-90">
                  <Image src="/logos/partners/yc.png" alt="Y Combinator" fill className="object-contain" />
                </div>
                {/* Entrepreneurs First — stacked wordmark, full color, height matched to YC mark */}
                <Image
                  src="/logos/partners/ef.png"
                  alt="Entrepreneurs First"
                  width={1081}
                  height={214}
                  className="h-3.5 md:h-6 w-auto object-contain opacity-90"
                />
                {/* a16z Speedrun — wordmark, pure white, height matched to YC mark */}
                <Image
                  src="/logos/partners/speedrun.png"
                  alt="a16z Speedrun"
                  width={514}
                  height={72}
                  className="h-3.5 md:h-6 w-auto object-contain"
                />
              </div>
              <div className="flex items-center justify-center gap-5 md:contents">
                {/* Z Fellows — wordmark, full color, height matched to YC mark */}
                <Image
                  src="/logos/partners/zfellows.png"
                  alt="Z Fellows"
                  width={787}
                  height={138}
                  className="h-3.5 md:h-6 w-auto object-contain opacity-90"
                />
                {/* Afore — horizontal wordmark, full color */}
                <div className="relative w-11 h-3.5 md:w-20 md:h-6 opacity-90">
                  <Image src="/logos/partners/afore.png" alt="Afore Capital" fill className="object-contain" />
                </div>
                {/* 1517 — horizontal wordmark, full color red */}
                <div className="relative w-8 h-3.5 md:w-14 md:h-6 opacity-90">
                  <Image src="/logos/partners/1517.png" alt="1517 Fund" fill className="object-contain" />
                </div>
              </div>
            </div>
          </div>

          <div className="animate-fade-up opacity-0 animation-delay-300 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/found"
              className="sheen group inline-flex items-center gap-2 rounded-full bg-[#0165fc] px-7 py-3.5 text-[15px] font-semibold text-white transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5"
              style={{
                boxShadow:
                  "inset 0 1px 0 0 rgba(255,255,255,0.32), 0 12px 32px -8px rgba(1,101,252,0.7)",
              }}
            >
              Start a company
              <IconArrowRight
                className="h-3.5 w-3.5 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1"
                stroke={2.2}
              />
            </Link>

            <Link
              href="/intern"
              className="glass glass-hover inline-flex items-center rounded-full px-7 py-3.5 text-[15px] font-medium text-white/85"
            >
              Intern at a startup
            </Link>
          </div>
        </div>

      </section>

      {/* Stats Section - Full Width Band */}
      <section className="py-8 bg-white/[0.025] border-y border-white/[0.07]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {stats.map((stat, index) => (
              <ScrollReveal key={stat.label} delay={index * 100}>
                <div className="text-center">
                  <p className="font-black text-2xl md:text-5xl text-white mb-1 md:mb-2">
                    {stat.value}
                  </p>
                  <p className="text-[var(--muted-light)] text-xs md:text-base">{stat.label}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="font-black text-4xl md:text-5xl text-white mb-4">
                Who We Are
              </h2>
              <p className="text-[var(--muted-light)] text-lg max-w-2xl mx-auto">
                Claremont Accelerator is the only school-sponsored startup accelerator supporting the five Claremont Colleges. We help student-founders start and scale their startups by providing them with mentorship, manpower, and money.
              </p>

              {/* The 5Cs */}
              {/* Below md: two explicit rows of 3+2, each independently centered with a
                  uniform gap — natural flex-wrap row count depends on viewport width
                  (it collapses to one row well before md), so row count is fixed
                  explicitly here instead. md:contents drops the row wrappers on
                  desktop so children rejoin the single flex-wrap row unchanged. */}
              <div className="mt-10 flex flex-col gap-5 md:flex-row md:flex-wrap md:items-center md:justify-center md:gap-10">
                <div className="flex items-center justify-center gap-6 md:contents">
                  <Image src="/logos/schools/cmc.png" alt="Claremont McKenna College" width={2490} height={2489} className="h-10 md:h-16 w-auto object-contain" />
                  <Image src="/logos/schools/pitzer.png" alt="Pitzer College" width={479} height={405} className="h-10 md:h-16 w-auto object-contain" />
                  <Image src="/logos/schools/harvey_mudd.png" alt="Harvey Mudd College" width={281} height={180} className="h-10 md:h-16 w-auto object-contain" />
                </div>
                <div className="flex items-center justify-center gap-6 md:contents">
                  <Image src="/logos/schools/scripps.png" alt="Scripps College" width={250} height={223} className="h-10 md:h-16 w-auto object-contain" />
                  <Image src="/logos/schools/pomona.png" alt="Pomona College" width={342} height={550} className="h-10 md:h-16 w-auto object-contain" />
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* 3 Program Cards */}
          <h3 className="font-bold text-2xl text-white mb-4">Our Programs</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Claremont Accelerator (Main Program) */}
            <ScrollReveal delay={0}>
              <div className="glass glass-hover rounded-2xl p-6 h-full flex flex-col">
                <h3 className="font-black text-xl text-white mb-2">Claremont Accelerator</h3>
                <p className="text-[#3385fd] text-sm font-medium mb-3">Main Program</p>
                <ul className="text-[var(--muted)] text-sm space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-white">•</span>
                    <span>Year-long cohort</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-white">•</span>
                    <span>Up to <span className="text-white font-medium">$15K</span> in funding</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-white">•</span>
                    <span>For startups with traction</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-white">•</span>
                    <span>Matched with paid interns</span>
                  </li>
                </ul>
                <div className="mt-auto pt-6">
                  <Link
                    href="/found/cohort"
                    className="inline-flex items-center justify-center rounded-full px-6 py-3 text-[15px] font-semibold text-white transition-transform hover:scale-105"
                    style={{ background: "#0165fc" }}
                  >
                    Apply
                  </Link>
                </div>
              </div>
            </ScrollReveal>

            {/* CA Studio */}
            <ScrollReveal delay={100}>
              <div className="glass glass-hover rounded-2xl p-6 h-full flex flex-col">
                <h3 className="font-black text-xl text-white mb-2">CA Studio</h3>
                <p className="text-[#3385fd] text-sm font-medium mb-3">Pre-Accelerator</p>
                <ul className="text-[var(--muted)] text-sm space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-white">•</span>
                    <span>Semester-long program</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-white">•</span>
                    <span>Up to <span className="text-white font-medium">$1K</span> in funding</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-white">•</span>
                    <span>Teams and solo participants welcome</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-white">•</span>
                    <span>Early-stage / idea-stage founders</span>
                  </li>
                </ul>
                <div className="mt-auto pt-6">
                  <a
                    href="https://docs.google.com/forms/d/e/1FAIpQLSeg2lSHEbIUKTTvpywkVSm-A_GKXojY0z3jSTLk5ASCzPBt1w/viewform"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-full px-6 py-3 text-[15px] font-semibold text-white transition-transform hover:scale-105"
                    style={{ background: "#0165fc" }}
                  >
                    Apply
                  </a>
                </div>
              </div>
            </ScrollReveal>

            {/* Intern Program */}
            <ScrollReveal delay={200}>
              <div className="glass glass-hover rounded-2xl p-6 h-full flex flex-col">
                <h3 className="font-black text-xl text-white mb-2">Intern Program</h3>
                <p className="text-[#3385fd] text-sm font-medium mb-3">Work at a Startup</p>
                <ul className="text-[var(--muted)] text-sm space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-white">•</span>
                    <span>Paid positions at CA startups</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-white">•</span>
                    <span>Real startup experience</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-white">•</span>
                    <span>Work directly with founders</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-white">•</span>
                    <span>Build your portfolio</span>
                  </li>
                </ul>
                <div className="mt-auto pt-6">
                  <Link
                    href="/intern"
                    className="inline-flex items-center justify-center rounded-full px-6 py-3 text-[15px] font-semibold text-white transition-transform hover:scale-105"
                    style={{ background: "#0165fc" }}
                  >
                    Learn more
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="pt-8 pb-8 overflow-hidden">
        <div className="max-w-6xl mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-10">
              <h2 className="font-black text-4xl md:text-5xl text-white mb-4">
                Startups We&apos;ve Supported
              </h2>
              <p className="text-[var(--muted)] text-lg max-w-2xl mx-auto">
                Join the ranks of innovative companies that got their start with us
              </p>
            </div>
          </ScrollReveal>
        </div>

        {/* Scrolling Logo Marquee */}
        <ScrollReveal>
          <div className="relative w-full overflow-hidden py-4">
            <div
              className="flex w-max"
              style={{
                animation: 'marquee 30s linear infinite',
              }}
            >
              {/* First set of logos */}
              {startups.map((startup, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 px-0.5 md:px-1 flex items-center justify-center"
                >
                  <Image
                    src={startup.logo}
                    alt={startup.name}
                    width={startup.size === "large" ? 360 : 280}
                    height={startup.size === "large" ? 180 : 140}
                    className={`object-contain brightness-0 invert opacity-70 hover:opacity-100 transition-opacity ${
                      startup.size === "large" ? "max-h-[45px] md:max-h-[90px]" : "max-h-[35px] md:max-h-[70px]"
                    }`}
                  />
                </div>
              ))}
              {/* Duplicate set for seamless loop */}
              {startups.map((startup, index) => (
                <div
                  key={`dup-${index}`}
                  className="flex-shrink-0 px-0.5 md:px-1 flex items-center justify-center"
                >
                  <Image
                    src={startup.logo}
                    alt={startup.name}
                    width={startup.size === "large" ? 360 : 280}
                    height={startup.size === "large" ? 180 : 140}
                    className={`object-contain brightness-0 invert opacity-70 hover:opacity-100 transition-opacity ${
                      startup.size === "large" ? "max-h-[45px] md:max-h-[90px]" : "max-h-[35px] md:max-h-[70px]"
                    }`}
                  />
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </section>
      </div>
    </div>
  );
}
